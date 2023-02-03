import React from 'react'
import AdminSass from "./Admin.module.sass";

const Admin = () => {
  return (
    <div className={AdminSass.products}>
        <div>insert products</div>
        <form>
          Title: <input type="text"/>
          Description : <input type="text"/>
          Long Description : <textarea type="textarea"/>
        </form>
    </div>
  )
}

export default Admin
