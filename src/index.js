import ReactDOM from 'react-dom';


import { BrowserRouter as Router,    // Router is upper most tag which encapsulates all Routes or Route
        Routes,                      // all of your Route or path should be encapsulated inside this Routes tag, all of the time
        Route,                       // for giving particular route or path
        Navigate,                    //  Navigate le auta route or path lai arko route or path ma laijancha
        Link,                        // Link le pani url redirection ma help garcha and it also helps to pass parameter
        Outlet,                      // Nested react component lai current rendered component vitrai specific location ma mount garna help garcha.
        useParams,                   // useParams hook ko help batw parameter access garna sakincha
        NavLink,                     // NavLink le pani url redirection ma help garcha and it also helps to pass parameter
        useNavigate,                 // useNavigate hook ko help batw pani arko url ma jana sakincha with carrying or passing parameter with it .
        useLocation,                 // useLocation hook le ahile ko current url ma vayeko state object lai access garna help garcha.

} from 'react-router-dom'

ReactDOM.render(

  // NOTE : sabbai code yehi index.js mai matra lekhera sajilai sikna sakiyos vanera app.js component lai faldeko .. just for easy learning.


  <Router>
    <Routes>


      <Route path="/" element={<Home />} />               {/* Route ko element attribute vitra component pass garincha */} {/* Hamro aafnai home component banayera use gareko instead of using app.js component */}
      {/* <Route path="/" element={<p>Paragraph of home Component</p>} />     element attribute vitra componenet matrai pass garna milcha vanni chaina, JSX pani pass garna sakincha ... but this is not recommended by react so this is not good approach */}



      <Route path="/myapps" element={<Navigate replace to="/learn" />} />     {/* Navigate le auta route or path lai arko route or path ma laijancha ... and replace le chai acutally mai arko path ma redirect garne kaam garcha */}



      {/* Using Concept of Route Nesting in React JS */}
      <Route path="/learn" element={<Learn />}>                                      

        <Route path="courses" element={<Courses />}>                        {/* courses path is Nested Route */}
          <Route path=":courseid" element={<CourseId />} />                 {/* Syntax of passing parameter in Route Path ==>  :parameter  ... parameter ko agadi colon lekhnai parcha */}  {/*  :parameter carrying path is Nested Route */}
        </Route>

        <Route path="bundles" element={<Bundles />} />                      {/* bundles path is Nested Route */}

      </Route>




      <Route path="/dashboard" element={<Dashboard />} />


    </Routes>
  </Router>,



  document.getElementById('root')
);



function Home() {           {/* hamile banayeko Home Component function */}

  return(
    <div>
      <h1>Home Route</h1>
    </div>
  )

}



function Learn() {           {/* hamile banayeko Learn Component function*/}

  return(
    <div>
      <h1>Learn Route</h1>
      <h4>All courses are listed here</h4>


      <Link className="btn btn-success" to="/learn/courses">
        courses
      </Link>

      {" "}

      <Link className="btn btn-primary" to="/learn/bundles">
        bundle
      </Link>

      <Outlet />                    {/* learn route vitra jun jun route nested vako compoenent chan tyo sabai component haru lai, last ma display garna ko lagi yesari learn component ko last ma <Outlet /> lekhincha */}

    </div>
  )

}


function Courses() {

  const courseList = ["React", "Angular", "Vue", "Nodejs"];                            // creating courseList array with some courses names

  const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)];   // For getting the single random course.

  return (
    <div>

      <h1>Click on following Course</h1>
      
      <NavLink
        style={({ isActive }) => {                  //  NavLink tag ma style use garna milcha and isActive vanni chai react le inbuilt deko attribute ho.. you don't have need to declare it.
          return {
            backgroundColor: isActive ? "white" : "yellow",
          };
        }}
        to={`/learn/courses/${randomCourseName}`}
      >
        {randomCourseName}
      </NavLink>


      <Outlet />                      {/* Since courses component route has nested route .. so, Courses compnent vitra yesari Outlet lekhna parcha which means nested component will mount in this location inside this Courses component */}
    
    </div>
  );

}



function CourseId() {

  const navigate = useNavigate();           // useNavigate hook ko help batw pani arko url ma jana sakincha with carrying parameter with it .... so Link or NavLink lai use nagari  useNavigate() hook lai pani use garna sakincha  // useNavigate() hook le data lai serialize garcha (i.e string ma laijancha)

  const { courseid } = useParams();         // useParams() hook chai route or path ma vayeko specific paramter lai access garna use garincha.

  return (
    <div>
      <h1>Received URL Parameter is : {courseid}</h1>

      <button
        onClick={() => {
          navigate("/dashboard", { state: "9$" });           {/* useNavigate() hook use garyo vani, state nai huncha parcha object ko key name */}
        
          // navigate("/dashboard", { state: courseid });     {/* yesari dynamic data pani pathauna sakincha useNavigate() hook ko use garera */}
        }}
        className="btn btn-warning"
      >
        Price of the {courseid} 
      </button>


      <Link to="/dashboard" state={courseid}>              {/* yesari Link ko help batw pani state pathauna sakincha */}  {/* state nai huncha parcha variable ko name */}
        Course
      </Link>

    </div>
  );

}



function Bundles() {
  return (
    <div>
      <h1>Bundle list</h1>
      <h4>Bundle card</h4>
    </div>
  );
}


function Dashboard() {

  const location = useLocation();         // useLocation hook le ahile ko current url ma vayeko state object lai access garna help garcha... // useLocation() le data lai serialize garcha (i.e string ma laijancha) 

  return (
    <div>
      <h1>Info that i got in dashboard is {location.state}</h1>       {/* state nai huncha parcha object ko key name */}
    </div>
  );

}


