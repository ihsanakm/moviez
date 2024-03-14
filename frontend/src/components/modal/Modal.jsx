import React, { useState, useEffect } from "react";

import './modal.scss'
import UpdateForm from "../forms/updateForm";
const Modal = ({ selectedSingleMovie,setIsModalOpen }) => {

 





  return (
    <div>
    
          <UpdateForm selectedSingleMovie={selectedSingleMovie} setIsModalOpen={setIsModalOpen}/>

     
    </div>
  );
};

export default Modal;
