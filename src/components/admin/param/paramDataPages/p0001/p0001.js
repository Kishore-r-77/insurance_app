import React , { forwardRef, useRef, useImperativeHandle } from 'react';
import './p0001.css'
const P0001 = forwardRef((props,ref) => {

    const freelookRef = useRef();
    const maxlifeRef = useRef();
    const minlivesRef = useRef();
    const minsuryrsRef = useRef();
    const productFamilyRef = useRef();
    const reinMonthRef = useRef();
    const renewableRef = useRef(); 
    const singleRef = useRef(); 
    let dataret = props.data;
      
      useImperativeHandle(ref, () => ({
 
       
        getData() {
       
            
             dataret.freeLookPeriod = freelookRef.current.value;
             dataret.maxLives = maxlifeRef.current.value;
             dataret.minLives = minlivesRef.current.value;
             dataret.minSurrYrs = minsuryrsRef.current.value;
             dataret.productFamily = productFamilyRef.current.value;
             dataret.reinstatementMonth  = reinMonthRef.current.value;
             dataret.renewable  = renewableRef.current.value;
             dataret.single  = singleRef.current.value;
            return dataret
          
        }
    
      }));

  
    
   

          return(<> <div className="row"> 
    
           <div className="form-group col-sm-6">
       
             <label  htmlFor="freeLookPeriod" >Free Look Period</label>
             
             <input type="text" disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {freelookRef} defaultValue = {props.data.freeLookPeriod} className="form-control form-control-sm rounded-1"   name="freeLookPeriod"    id = "freeLookPeriod"/>  
           </div>

           <div className="form-group col-sm-6">
       
       <label  htmlFor="maxLives" >Maximum Lives</label>
       
       <input type="text" disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {maxlifeRef} defaultValue = {props.data.maxLives} className="form-control form-control-sm rounded-1"   name="maxLives"    id = "maxLives"/>  
     </div>
           </div>
           
           <div className="row"> 
    
           <div className="form-group col-sm-6">
       
             <label  htmlFor="minLives" >Minimum Lives</label>
             
             <input type="text" disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {minlivesRef} defaultValue = {props.data.minLives} className="form-control form-control-sm rounded-1"   name="minLives"    id = "minLives"/>  
           </div>

           <div className="form-group col-sm-6">
       
       <label  htmlFor="minSurrYrs" >Minimum Surrender Years</label>
       
       <input type="text" disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {minsuryrsRef} defaultValue = {props.data.minSurrYrs} className="form-control form-control-sm rounded-1"   name="minSurrYrs"    id = "minSurrYrs"/>  
     </div>
           </div>

           <div className="row"> 
    
    <div className="form-group col-sm-6">

      <label  htmlFor="productFamily" >Product Family</label>
      
      <input type="text" disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {productFamilyRef} defaultValue = {props.data.productFamily} className="form-control form-control-sm rounded-1"   name="productFamily"    id = "productFamily"/>  
    </div>

    <div className="form-group col-sm-6">

<label  htmlFor="reinstatementMonth" >Reinstatement Month</label>

<input type="text" disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {reinMonthRef} defaultValue = {props.data.reinstatementMonth} className="form-control form-control-sm rounded-1"   name="reinstatementMonth"    id = "reinstatementMonth"/>  
</div>
    </div>

    <div className="row"> 
    
    <div className="form-group col-sm-6">

      <label  htmlFor="renewable" >Renewable</label>
      
      <input type="text" disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {renewableRef} defaultValue = {props.data.renewable} className="form-control form-control-sm rounded-1"   name="renewable"    id = "renewable"/>  
    </div>

    <div className="form-group col-sm-6">

<label  htmlFor="single" >Single</label>

<input type="text" disabled = {props.mode === 'display' || props.mode === 'delete'}  ref = {singleRef} defaultValue = {props.data.single} className="form-control form-control-sm rounded-1"   name="single"    id = "single"/>  
</div>
    </div>
           
           </>  
           
           )


}
);

export default P0001;