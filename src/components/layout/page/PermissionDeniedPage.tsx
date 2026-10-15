import { Link } from "react-router-dom";

const PermissionDenied = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">403</h1>
        <p className="mb-4 text-xl text-muted-foreground">Permission Denied</p>
        <p className="mb-6 text-muted-foreground">You don't have access to this page.</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PermissionDenied;
