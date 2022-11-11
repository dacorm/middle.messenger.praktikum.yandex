export interface RouteProps {
    rootQuery?: string;
    exact?: boolean;
    user?: Record<string, string> | null;
    error?: number;
}