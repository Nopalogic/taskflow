import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="mb-4 text-9xl font-bold text-gray-200">404</h1>
          <div className="mx-auto mb-8 h-1 w-24 bg-gray-300"></div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="mb-8 leading-relaxed text-gray-600">
            Sorry, the page you are looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
            onClick={() => navigate("/u")}
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>

          <Button
            variant="outline"
            className="w-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
