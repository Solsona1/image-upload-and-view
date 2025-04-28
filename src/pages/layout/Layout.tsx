import { Header } from "../../components/header/Header"
import "./Layout.css"
import { Outlet } from "react-router"

export const Layout = () => {
    return (
      <div id="app-page">
        <Header/>
        <main>
          <Outlet/>
        </main>
      </div>
    )
}
