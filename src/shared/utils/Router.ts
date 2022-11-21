import { Route } from './Route';
import { RouterProps } from '../interfaces/RouterProps';
import Block from '../../core/Block';

export default class Router {
  private static __instance: Router;

  public history: History;

  private routes: Route[];

  private _currentRoute: Route;

  private _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  static getInstance() {
    return this.__instance;
  }

  use({
    pathname, block, props = {}, exact = true, needAuth = false, onNonauthorized,
  }: RouterProps) {
    const route = new Route(
      pathname,
            block as unknown as Block,
            { rootQuery: this._rootQuery, exact },
            props,
            needAuth,
            onNonauthorized,
    );
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as typeof window).location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    this._currentRoute?.leave();
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.go(-1);
  }

  forward() {
    this.history.go(1);
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
