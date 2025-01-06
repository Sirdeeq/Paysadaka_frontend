
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';
import StickyButton from './pages/StickyButton'; // Import the StickyButton component

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
      <StickyButton />
    </>
  );
}

export default App;