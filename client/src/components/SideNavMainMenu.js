import swal from "sweetalert";
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SidebarHeader,
  SidebarContent,
  SidebarFooter,} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { BsCollectionPlay, BsFilm, BsHouseDoorFill } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { gql, useQuery, useMutation } from "@apollo/client";
import { GiSelfLove } from 'react-icons/gi'
import HistoryGame from './HistoryGame'

export const GET_USERBYID = gql`
  query GetById($dataUser: String) {
    user(username: $dataUser) {
      _id
      username
      score
    }
  }
`;

export const SideNavMainMenu = () => {
  const history = useHistory()

  const logoutHandler = () => {
    localStorage.clear();
    swal("you are successfully logout", "", "success");
    history.push("/login");
  };


  const { error, loading, data: dataFromApollo } = useQuery(GET_USERBYID, {
    variables: { dataUser: localStorage.getItem("username") },
  });

  const styles = {
    activeLink : {
      backgroundColor: "#2d3c45",
      color: '#17a2b8',
      borderRight: 'solid 6px rgb(23, 162, 184)',
    },
    sideBar: {
      padding: '24px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      letterSpacing: '1px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '29px',
    },
    proSideBar: {
      backgroundColor: '#1f4068 !important', 
      fontFamily: 'Roboto Condensed',
    }
  }

  return (
    <>
    <ProSidebar  
      breakPoint="md"
      style={styles.proSideBar}  
    >
      <SidebarHeader style={styles.sideBar}>
        <div>
          <b>Chess</b> <span style={{color: '#ff0000'}}> MASTER</span>
        </div>
      </SidebarHeader>
      <SidebarContent >
        <Menu iconShape="square">
          <MenuItem>
            <div className="card bg-dark mb-3" >
              <div className="card-body" style={{borderBottom: '4px solid gold'}}>
                {dataFromApollo && (
                  <>
                  <div className="row d-flex justify-content-center bg-danger" style={{}}>
                    <h4 className="card-title text-center text-white" style={{margin: '5px'}}> {dataFromApollo.user.username} </h4>
                  </div>
                  <div className="row bg-dark d-flex justify-content-center">
                    <p className="card-text text-white pt-3" style={{fontSize: '34pt', fontStyle: 'oblique'}}> {dataFromApollo.user.score} </p>
                  </div>
                  </>
                )}
              </div>
            </div>
          </MenuItem>
          <MenuItem>
                <HistoryGame/>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
      <div
          className="sidebar-btn-wrapper text-center"
          style={{
            padding:'20px 10px',
          }}
        >
          <button className="btn btn-danger" onClick={(e) => logoutHandler(e)} style={{boxShadow: '2px 3px 5px 0px rgba(0,0,0,0.75)'}}>
            Logout
          </button>
        </div>
      </SidebarFooter>
    </ProSidebar>
    </>
  )
}