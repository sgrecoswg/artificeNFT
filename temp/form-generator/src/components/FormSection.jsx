import { useState } from "react";
import{ Card,Collapse} from 'react-bootstrap';
import {GrUp,GrDown} from 'react-icons/gr';
import styled from 'styled-components';

const FormSection= ({section,history}) =>{
    const[open,setOpen] = useState(false);
    
    

    const OpenIcon = open ?
     (<GrUp style={{marginRight:"10px"}}></GrUp>)
    :(<GrDown style={{marginRight:"10px"}}></GrDown>);

    const StyledCard = styled(Card)`
        margin-top:10px;
        background-color:#e0e0e0;
        color:black;
        padding:5px;
    `;

    return(
        <StyledCard>
            <Card.Title onClick={()=>{setOpen(!open);}}>
                <div style={{disply:"none",alignItems:"center"}}>
                    <h5 style={{display:"inline-block",
                        marginBottom:"0",
                        marginTop:"10px",
                        marginLeft:"10px"
                    }}>
                        {section.title}
                    </h5>
                </div>
                <div style={{textAlign:"right",flexGrow:"100"}}>{OpenIcon}</div>
            </Card.Title>
            <Collapse in={open}>
                <div style={{color:"black"}}>
                    <Card.Body>
                        {section.groups.map((g)=>{
                            return(
                                <div key={g.key}>{g.title}</div>
                            );                            
                        })}
                    </Card.Body>
                </div>
            </Collapse>
        </StyledCard>

    );

}

export default FormSection;