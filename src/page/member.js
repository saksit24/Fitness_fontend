import React, { Component } from 'react';
import {  MDBRow,  MDBCard, MDBCardBody,  MDBIcon, MDBCol, MDBCardImage, MDBCardText, MDBCardTitle } from "mdbreact";



export class member extends Component {
    render() {
        return (
          <div>
          <MDBRow>
            <MDBCol md="6" lg="4">
              <MDBCard personal className="my-5">
                <MDBCardImage
                  top
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(29).jpg"
                  alt="MDBCard image cap"
                />
                <MDBCardBody>
                  <MDBCardTitle>
                    <a href="#!" className="title-one">
                      สมพง
                    </a>
                  </MDBCardTitle>
                  <p className="card-meta">Member expiration</p>
                  <MDBCardText>32 วัน 20 นาที 15 วินาที</MDBCardText>
                  <hr />
                  <a href="#!" className="card-meta">
                    <span>
                      {/* <MDBIcon icon="user" /> */}
                      ตรวจสอบ
                    </span>
                  </a>
                </MDBCardBody>
              </MDBCard>
         
            </MDBCol>
      
            <MDBCol md="6" lg="4">
              <MDBCard personal className="my-5">
                <MDBCardImage
                  top
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(29).jpg"
                  alt="MDBCard image cap"
                />
                <MDBCardBody>
                  <MDBCardTitle>
                  <a href="#!" className="title-one">
                      สมพง
                    </a>
                  </MDBCardTitle>
                  <p className="card-meta">Member expiration</p>
                  <MDBCardText>32 วัน 20 นาที 15 วินาที</MDBCardText>
                  <hr />
                  <a href="#!" className="card-meta">
                    <span>
                      {/* <MDBIcon icon="user" /> */}
                      ตรวจสอบ
                    </span>
                  </a>
                </MDBCardBody>
              </MDBCard>
          </MDBCol>
          <MDBCol md="6" lg="4">
              <MDBCard personal className="my-5">
                <MDBCardImage
                  top
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(29).jpg"
                  alt="MDBCard image cap"
                />
                <MDBCardBody>
                  <MDBCardTitle>
                  <a href="#!" className="title-one">
                      สมพง
                    </a>
                  </MDBCardTitle>
                  <p className="card-meta">Member expiration</p>
                  <MDBCardText>32 วัน 20 นาที 15 วินาที</MDBCardText>
                  <hr />
                  <a href="#!" className="card-meta">
                    <span>
                      {/* <MDBIcon icon="user" /> */}
                      ตรวจสอบ
                    </span>
                  </a>
                </MDBCardBody>
              </MDBCard>
          </MDBCol>
          <MDBCol md="6" lg="4">
              <MDBCard personal className="my-5">
                <MDBCardImage
                  top
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(29).jpg"
                  alt="MDBCard image cap"
                />
                <MDBCardBody>
                  <MDBCardTitle>
                  <a href="#!" className="title-one">
                      สมพง
                    </a>
                  </MDBCardTitle>
                  <p className="card-meta">Member expiration</p>
                  <MDBCardText>32 วัน 20 นาที 15 วินาที</MDBCardText>
                  <hr />
                  <a href="#!" className="card-meta">
                    <span>
                      {/* <MDBIcon icon="user" /> */}
                      ตรวจสอบ
                    </span>
                  </a>
                </MDBCardBody>
              </MDBCard>
          </MDBCol>
          </MDBRow>
          </div>
        )
    }
}

export default member
