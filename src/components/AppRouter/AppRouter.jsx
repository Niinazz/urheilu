import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddItem from '../AddItem';
import EditItem from '../EditItem';
import ErrorPage from '../ErrorPage';
import Items from '../Items';
import Root from '../Root';
import Settings from '../Settings';
import Stats from '../Stats';

function AppRouter(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "", // Täällä määritellään reitti ensimmäiselle sivulle (items)
          element: <Items />,
          loader: () => { return props.data },
        },
        { 
          path: "add", 
          element: <AddItem onItemSubmit={props.onItemSubmit} typelist={props.typelist} /> 
        },
        { 
          path: "edit/:id", 
          element: <EditItem onItemSubmit={props.onItemSubmit} onItemDelete={props.onItemDelete} typelist={props.typelist} />,
          loader: ({params}) => {
            const item = props.data.find(item => item.id === params.id); // Etsitään item id:n mukaan
            if (item) {
              return { item };
            } else {
              throw new Response("Not Found", { status: 404 });
            }
          }
        },
        { 
          path: "stats", 
          element: <Stats data={props.data} /> 
        },
        { 
          path: "settings", 
          element: <Settings 
                    typelist={props.typelist} 
                    onTypeSubmit={props.onTypeSubmit} 
                    user={props.user} 
                    auth={props.auth} 
                  />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default AppRouter;


