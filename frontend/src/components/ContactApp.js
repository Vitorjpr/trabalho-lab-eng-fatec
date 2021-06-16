import React from 'react';
import axios from "axios";
import ContactTable from './ContactTable';

function LabelInput(props) {

  if (props.disabled){
    return(
      <div className="form-group">
        <label>{props.label}</label>
        <input  type="TEXT" value={props.value} 
                className='form-control' disabled
                onChange={(e) => {
                  if(props.atualizarTexto) {
                    props.atualizarTexto(e.target.value);
                  }
                }}/>
      </div>
    );
  } else {
    return(
      <div className="form-group">
        <label>{props.label}</label>
        <input  type="TEXT" value={props.value} 
                className='form-control'
                onChange={(e) => {
                  if(props.atualizarTexto) {
                    props.atualizarTexto(e.target.value);
                  }
                }}/>
      </div>
    );
  }
  
}

class ContactApp extends React.Component {
  state = {
      currentContact: {
        id: "",
        name: "",
        email: "",
        phone: ""
      },
      contactList: [],
  }

  componentDidMount() {
      const cfg = {
        responseType: 'json',
      }
      axios.get(`http://localhost:8080/contact`, cfg)
        .then((response) => {
            console.log(response);
            const novoState = {...this.state};
            novoState.contactList = response.data;

            for (let i = 0; i > novoState.contactList.length; i++) { 
                const elemento = novoState.contactList[i];
                elemento.name = elemento.name.toUpperCase();
            }

            console.log("Contacts Loaded");
            this.setState(novoState);
        })
        .catch((err)=> {
            console.log("Erro =>", err);
        })
  }

  atualizarTexto(campo, txt) {
    const novoState = {...this.state};
    novoState.currentContact[campo] = txt;
    this.setState(novoState);
  }

  salvar() {
    let edit = this.state.currentContact.id
    if(edit) {
      const data = {
          id: this.state.currentContact.id,
          name: this.state.currentContact.name,
          email: this.state.currentContact.email,
          phone: this.state.currentContact.phone
      }
      let id = this.state.currentContact.id
      axios.put(`http://localhost:8080/contact/${id}`, data)
        .then((response) => {
            console.log("Contact has been updated!");
            this.componentDidMount();
            this.limpar();
        })
        .catch((err) => {
            console.log("Error during saving contact", err.response);
        })
    } else {
      const data = {
        name: this.state.currentContact.name,
        email: this.state.currentContact.email,
        phone: this.state.currentContact.phone
      }
      axios.post('http://localhost:8080/contact', data)
        .then((response) => {
            console.log("Contact has been saved!");
            this.componentDidMount();
            this.limpar();
        })
        .catch((err) => {
            console.log("Error during saving contact", err.response);
        })
    }
  }
  
  editar() {
    let id = window.prompt("Por favor, insira o ID do contato que deseja editar.");
    
    axios.get(`http://localhost:8080/contact/${id}`)
      .then((response) => {
          this.atualizarTexto('id', response.data.id)
          this.atualizarTexto('name', response.data.name)
          this.atualizarTexto('email', response.data.email)
          this.atualizarTexto('phone', response.data.phone)
      })
      .catch((err) => {
          console.log("Error during deleting contact", err.response);
      })
  }

  deletar() {
    let id = window.prompt("Por favor, insira o ID do contato que deseja excluir.");
    
    axios.delete(`http://localhost:8080/contact/${id}`)
      .then((response) => {
          console.log("Contact has been deleted!");
          this.componentDidMount();
      })
      .catch((err) => {
          console.log("Error during deleting contact", err.response);
      })
  }

  limpar() {
    this.atualizarTexto('id', '')
    this.atualizarTexto('name', '')
    this.atualizarTexto('email', '')
    this.atualizarTexto('phone', '')
  }

  render() {
    return (
      <div className="container">
        <h1>Contact Management</h1>
        
        <LabelInput label="ID:" corFundo="#DDDD00" disabled='true'
                    value={this.state.currentContact.id}
                    atualizarTexto={(txt) => this.atualizarTexto('id', txt)}
        />

        <LabelInput label="Name:" corFundo="#DDDD00"
                    value={this.state.currentContact.name}
                    atualizarTexto={(txt) => this.atualizarTexto('name', txt)}
        />

        <LabelInput label="Email:" corFundo="#DDDD00"
                    value={this.state.currentContact.email}
                    atualizarTexto={(txt) => this.atualizarTexto('email', txt)}
        />

        <LabelInput label="Phone:" corFundo="#DDDD00"
                    value={this.state.currentContact.phone}
                    atualizarTexto={(txt) => this.atualizarTexto('phone', txt)}
        />

        <div className="mb-5">
          <button className="btn btn-success" onClick={ ()=>{this.salvar()} }>
              Salvar
          </button>

          <button className="btn btn-success ml-3" onClick={ ()=>{this.editar()} }>
              Editar
          </button>

          <button className="btn btn-danger ml-3" onClick={ ()=>{this.deletar()} }>
              Deletar
          </button>

          <button className="btn btn-primary ml-3" onClick={ ()=>{this.limpar()} }>
              Limpar
          </button>
        </div>

        <ContactTable state={this.state}/>

      </div>
    );
  }
}

export default ContactApp;

