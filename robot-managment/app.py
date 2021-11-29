# Webserver
from flask import Flask, jsonify, request, render_template, send_from_directory
from algorithms import bfs, bfsTest, greedy, greedyTest
import warnings

warnings.filterwarnings("ignore", category=UserWarning)

# http://localhost:5000
HOST = '0.0.0.0'
PORT = 5000

app = Flask(__name__, template_folder='templates')

# Web Server home page
@app.route("/")
def index():
    return render_template("index.html")

# BFS
@app.route("/api/bfs", methods=['POST'])
def runBFS():
    parameters = request.get_json()
    json_tree = parameters['tree']
    start = parameters['start']
    end = parameters['end']

    tree = {}
    for key in json_tree:
        tree[int(key)] = json_tree[key]

    steps = bfs.bfs_steps(tree, start, end)
    if steps == None:
        return jsonify([])
    else:
        return jsonify(steps)

# BFS Test
@app.route("/api/bfs/test", methods=['POST'])
def runBFSTest():
    parameters = request.get_json()
    json_tree = parameters['tree']
    numberOfTests = parameters['test']

    tree = {}
    for key in json_tree:
        tree[int(key)] = json_tree[key]

    testResult = bfsTest.runTest(numberOfTests, tree)
    return jsonify(testResult)

# Greedy
@app.route("/api/greedy", methods=['POST'])
def runGreedy():
    parameters = request.get_json()
    json_nodes = parameters['nodes']
    json_edges = parameters['edges']
    json_agents = parameters['agents']
    
    nodes = []
    edges = []
    agents = []
    for node in json_nodes:
        nodes.append(greedy.Node(node['id']))
    for edge in json_edges:
        edges.append(greedy.Edge(edge['fromID'], edge['toID'], edge['weight']))
    for agent in json_agents:
        agents.append(greedy.Agent(agent['id'], agent['startNode'], agent['budget']))

    model = greedy.GreedyModel(nodes, edges, agents)
    model.initAgents()
    
    intervals = model.greedy()
    return jsonify(intervals)

# Greedy Test
@app.route("/api/greedy/test", methods=['POST'])
def runGreedyTest():
    parameters = request.get_json()
    numberOfTests = parameters['test']
    numberOfNodes = parameters['node']

    results = greedyTest.runTests(numberOfTests, numberOfNodes)
    
    testResult = greedyTest.saveTestResults(results)
    return jsonify(testResult)

# Fav icon
@app.route('/favicon.ico') 
def favicon(): 
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run(host=HOST,debug=True,port=PORT)
