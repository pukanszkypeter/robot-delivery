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

  /** Run bfs tests */

  runBFSTest(tree: any, edgesCount: number): Observable<any> {
    console.log("hi");
    return this.http.post<any>('http://localhost:4200/api/bfsTest', {tree: this.convertTree(tree), edgesCount: edgesCount});
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
