import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  constructor(private http: HttpClient) { }

  /** BFS algorithm */
  runBFS(tree: any, start: number, end: number): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/bfs', {tree: this.convertTree(tree), start: start, end: end});
  }

  /** Greedy algorithm */
  runGreedy(greedyModel: {nodes: any[], edges: any[], agents: any[]}): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/greedy', {nodes: greedyModel.nodes, edges: greedyModel.edges, agents: greedyModel.agents})
  }

  /** Run BFS tests */
  runBFSTest(tree: any, test: number): Observable<any> {
    let treeToSend = this.convertTree(tree);
    return this.http.post<any>('http://localhost:4200/api/bfs/test', {tree: treeToSend, test: test});
  }

  /** Run Greedy tests */
  runGreedyTest(node: number, test: number): Observable<any> {
    return this.http.post<any>('http://localhost:4200/api/greedy/test', {node: node, test: test});
  }

  /** Helper Methods */
  convertTree(tree: any): any {
    let converted: {[key: string]: number[]} = {};

    for (let i = 0; i < tree.length - 1; i++) {
      for (let [key, value] of tree[i]) {
        converted[key] = value;
      }
    }

    return converted;
  }

}
