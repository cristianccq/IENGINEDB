# -*- coding: utf-8 -*-
"""
Created on Wed Jan 08 10:54:39 2018

@author: amanosalva
"""

from flask import Flask, jsonify
from flask import abort
from flask_cors import CORS
import json
import pymysql
from scipy import stats
import numpy as np
import pandas as pd

host = "localhost"
user = "IENGINEDB"
passwd = "IENGINEDB"
db = "IENGINEDB"

app = Flask(__name__)
CORS(app) 

# Utils
class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


    
@app.route('/get_data/<table_name>', methods=['GET'])
def get_tasks(table_name):

    conn = pymysql.connect(host=host, user=user, passwd=passwd, db=db)
    cur = conn.cursor()

    cliente_query = "SELECT * FROM ienginedb.{};".format(table_name)

    cur.execute(cliente_query)

    cur.close()
    conn.close()

    lista = []
    for row in cur:
        lista.append(row)

        
    return jsonify(lista)


@app.route('/get_density_data/<table_name>/<column>', methods=['GET'])
def get_density(table_name,column):

    conn = pymysql.connect(host=host, user=user, passwd=passwd, db=db)
    cur = conn.cursor()

    cliente_query = "SELECT * FROM ienginedb.{};".format(table_name)

    cur.execute(cliente_query)

    cur.close()
    conn.close()

    lista = []
    for row in cur:
        lista.append(row)

    cols =['id',"sepal.length","sepal.width","petal.length","petal.width","variety"]
    df = pd.DataFrame(lista,columns=cols)

    lista = []
    for color in df['variety'].unique():
        lista.append(df[df['variety']==color][column])

    x = np.arange(0., 30, .1)

    density_list = []
    for i in range(len(lista)):
        density = stats.kde.gaussian_kde(lista[i])
        density_list.append(density(x))

    result = []
    for k in range(len(x)):
        valor = []
        valor.append(x[k])
        for i in range(len(lista)):
            valor.append(density_list[i][k])
        result.append(valor)



    json_dump = json.dumps(result, cls=NumpyEncoder)

        
    return jsonify(eval(json_dump))


# @app.route('/clientes/<cliente_dni>/genero', methods=['GET'])
# def get_gender(cliente_dni):

#     conn = pymysql.connect(host=host, user=user, passwd=passwd, db=db)
#     cur = conn.cursor()

#     cliente_query = """SELECT genero FROM cliente WHERE dni = '%s';""" % (cliente_dni)

#     cur.execute(cliente_query)

#     cur.close()
#     conn.close()

#     lista = []
#     for row in cur:
#         lista.append(row)

#     if len(lista) > 0:
#         genero = lista[0]
#     else :
#         genero = None
        
#     return jsonify({'result': {'codigo': str(1), 'genero': genero}})
    

# @app.route('/auto/<marca>/<anio>', methods=['GET'])
# def consulta_cuota_auto(marca, anio):
#     conn = pymysql.connect(host=host, user=user, passwd=passwd, db=db)
#     cur = conn.cursor()

#     q = """SELECT factor FROM security_bot.factor_auto where modelo='%s' and anio='%s';""" % (marca, anio)
    
#     cur.execute(q)
#     lista =[]

#     for j in cur:
#         lista.append(j)

#     cur.close()
#     conn.close()

#     if len(lista) > 0:
#         cuota = lista[0]
#     else :
#         cuota = None
        
#     return jsonify({'result': {'codigo': str(1), 'cuota_auto': cuota}})


    
    

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')