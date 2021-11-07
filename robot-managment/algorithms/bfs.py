# Node class for tree
class Node:
    def __init__(self, id):
        self.id = id

# Edge class for tree
class Edge:
    def __init__(self, fromID, toID):
        self.fromID = fromID
        self.toID = toID

# Tree class
class Tree:
    def __init__(self, nodes, edges):
        self.nodes = nodes
        self.edges = edges

    # convert tree to dictionary
    def createMap(self):
        result = {}
        for i in self.edges:
            if i.fromID in result:
                result[i.fromID].append(i.toID)
            else:
                result[i.fromID] = [i.toID]
        return result

# Breadth-first search (with end value, so it outputs a path)
def bfs_steps(tree, start, end):
    queue = []
    queue.append([start])
    steps = []
    while queue:
        path = queue.pop(0)
        node = path[-1]
        steps.append(path)
        if node == end:
            return steps
        for adjacent in tree.get(node, []):
            new_path = list(path)
            new_path.append(adjacent)
            queue.append(new_path)

"""
EXAMPLE

node_a = Node(1)
node_b = Node(2)
node_c = Node(3)
node_d = Node(4)
node_e = Node(5)
node_f = Node(6)
node_g = Node(7)
node_h = Node(8)

nodes = []
nodes.append(node_a)
nodes.append(node_b)
nodes.append(node_c)
nodes.append(node_d)
nodes.append(node_e)
nodes.append(node_f)
nodes.append(node_g)
nodes.append(node_h)

edge_a_b = Edge(1, 2)
edge_a_c = Edge(1, 3)
edge_b_d = Edge(2, 4)
edge_b_e = Edge(2, 5)
edge_c_f = Edge(3, 6)
edge_c_g = Edge(3, 7)
edge_e_h = Edge(5, 8)

edges = []
edges.append(edge_a_b)
edges.append(edge_a_c)
edges.append(edge_b_d)
edges.append(edge_b_e)
edges.append(edge_c_f)
edges.append(edge_c_g)
edges.append(edge_e_h)

tree = Tree(nodes, edges)

print('Input:')
print(tree.createMap())
print('Output:')
print(bfs_steps(tree.createMap(), 1, 8))
"""