import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisService {

  constructor() { }

  calculateTreeData(level: number, children: number): {nodes: any[], edges: any[], model: any} {
    let nodes = [];
    let edges = [];

    let edgeID = 1;
    let tree = this.generateTree(level, children);

    for (let i = 0; i < tree.length; i++) {
      for (let [key, value] of tree[i]) {
        nodes.push({id: key, label: key.toString(), level: i+1, color: key === 1 ? '#bf00ff' : '#ffffff'});
        for (let j = 0; j < value.length; j++) {
          edges.push({id: edgeID, from: key, to: value[j], color: '#909090', arrows: { to: true } });
          edgeID++;
        }
      }
    }

    return {nodes: nodes, edges: edges, model: tree};
  }

  calculatePathData(path: number[], robots: number[], budget: number, weight: number): {nodes: any[], edges: any[], model: any} {
    let nodes = [];
    let edges = [];
    let model: {nodes: any[], edges: any[], agents: any[]} = {nodes: [], edges: [], agents: []};

    let robotID = 1;
    for (let i = 0; i < path.length; i++) {
      if (robots.includes(path[i])) {
        model.agents.push({id: robotID, startNode: path[i], budget: this.getRandomInt(5, budget)});
        robotID++;
      }
      if (i === 0) {
        nodes.push({id: path[i], label: path[i].toString(), level: i+1, color: '#ffa31a', title: 'sad', shape: robots.includes(path[i]) ? 'circularImage' : null, image: '../../../assets/icons/robot-icon.svg'});
      } else {
        nodes.push({id: path[i], label: path[i].toString(), level: i+1, color: robots.includes(path[i]) ? '#bf00ff' : '#ffffff', shape: robots.includes(path[i]) ? 'circularImage' : null, image: '../../../assets/icons/robot-icon.svg'});
      }
      model.nodes.push({id: path[i]});
      if (i !== path.length - 1) {
        const randomWeight = this.getRandomInt(1, weight);
        edges.push({id: i+1, from: path[i], to: path[i+1], label: randomWeight.toString(), color: '#909090', arrows: { to: true } });
        model.edges.push({fromID: path[i], toID: path[i+1], weight: randomWeight});
      }
    }

    return {nodes: nodes, edges: edges, model: model};
  }

  /** Creates a tree from level and children number */
  generateTree(level: number, children: number): Map<number, number[]>[] {
    let tree = [];
    let nodeID = 1;

    for (let i = 1; i <= level; i++) {
      /** Init root */
      if (i === 1) {
        let random = this.getRandomInt(2, children);
        let values = [];
        for (let j = 0; j < random; j++) {
          nodeID++;
          values.push(nodeID)
        }
        tree.push(new Map().set(i, values));

      } else {
        let map = new Map();
        /** Get parents */
        let parents = [];
        for (let [key, value] of tree[i-2]) {
          for (let x = 0; x < value.length; x++) {
            parents.push(value[x]);
          }
        }
        /** Push children */
        for (let k = 0; k < parents.length; k++) {
          let random = this.getRandomInt(2, children);
          let values = [];
          for (let j = 0; j < random; j++) {
            nodeID++;
            values.push(nodeID)
          }
          map.set(parents[k], values);
        }
        tree.push(map);
      }
    }

    return tree;
  }

  /** Helper Methods */

  getRandomInt(min: number,  max: number): number {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
  }

}
