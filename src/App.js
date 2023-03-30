// requerimientos del proyecto

// todo calendario
// 1 calendario usando la libreria de fullcalendar y sus plug in
//        este calendario debe de tener la vista de meses asi como los botones necesarios para cambiar mes a mes
//        cuando clickes en un dia debe de displeyar un modal o una ventana para introducir los turnos que trabaje esa persona ese dia
//        posiblemente tambien ahi en esa misma ventana lo de introducir las perentorias?
//        considerar esto una feacture a parte en otra ventana
//        esos turnos que introdujiste deben de quedar visibles en el calendario como eventos y deben de poder ser editables
//        los turnos tambien deben de reflejarse en el state de la app
//        y deben de quedar guardados a falta de un back end en el local storage del navegador


// todo dash board
// 2 Dashboard usando los datos introducidos por el usuario de debe de displayear un grafico (barras) con la cantidad de horas por mes
//        displeyar la cantidad de horas acumuladas anualmente (sumatoria de las horas mes a mes)
//        displeyear el porcentaje de la jornada de ese mes (horas trabajadas/ horas jornada completa)
//        y el promedio del porcentaje de jornada anual (sumaoria del porcentaje de jornada / cantidad de meses)
//        

// general imports
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material" //cssbaseline resetea el css a los default que necesitamos?? 
import { Routes, Route } from "react-router-dom"

// componentes
// import Topbar from "./scenes/global/Topbar"
import Sidebar from "./scenes/global/Sidebar"
import Dashboard from "./scenes/dashboard"
// import Team from "./scenes/team"
// import Invoices from "./scenes/invoices"
// import Contacts from "./scenes/contacts"
// import Bar from "./scenes/bar"
// import Form from "./scenes/form"
// import Line from "./scenes/line"
// import Pie from "./scenes/pie"
// import FAQ from "./scenes/faq"
// import Geography from "./scenes/geography"
import Calendar from "./scenes/calendar/Calendar.jsx"

// context
import { DayProvider } from "./context/day.context";

function App() {

  const [theme, colorMode] = useMode()
  return (

    <ColorModeContext.Provider value={colorMode}>

      <ThemeProvider theme={theme}>
        <DayProvider>
          <CssBaseline />
          <div className="app">

            <Sidebar />



            <main className="content">
              {/* <Topbar /> */}
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                {/* <Route exact path="/team" element={<Team />} /> */}
                {/* <Route exact path="/contacts" element={<Contacts />} /> */}
                {/* <Route exact path="/invoices" element={<Invoices />} /> */}
                {/* <Route exact path="/form" element={<Form />} /> */}
                {/* <Route exact path="/bar" element={<Bar />} /> */}
                {/* <Route exact path="/pie" element={<Pie />} /> */}
                {/* <Route exact path="/line" element={<Line />} /> */}
                {/* <Route exact path="/faq" element={<FAQ />} /> */}
                <Route exact path="/calendar" element={<Calendar />} />
                {/* <Route exact path="/geography" element={<Geography />} /> */}
              </Routes>
            </main>
          </div>
        </DayProvider>

      </ThemeProvider>

    </ColorModeContext.Provider>

  );
}

export default App;
