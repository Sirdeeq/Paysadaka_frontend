
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';
function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />

     
      
    </>
  );
}

export default App;