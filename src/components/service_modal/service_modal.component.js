import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styles from "./service_modal.module.scss";
import Axios from "axios";

const ServiceModal = (props) => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState({
    user: {
      name: {},
      address: {},
    },
  });

  useEffect(() => {
    setService(props.service);
    setOpen(props.open);
  }, [props]);

  let closeModal = () => setOpen(false);

  let contratarServico = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
    const data = {
      jobId: service._id,
      jobTitle: service.title,
      jobDescription: service.description,
      jobCategory: service.category,
      jobUser: service.user._id,
      jobUserName: service.user.name.firstName + ' ' + service.user.name.lastName
    }
    Axios.post('./api/contract/create_contract', data, config)
    .then(res=>{
      alert("Serviço solicitado com sucesso!")
    })
    .catch(err=>{
      alert(err)
    })
  }

  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      <div className={styles.ModalServico}>
        <a className={`close`} onClick={closeModal}>
          &times;
        </a>
        <h3>{service?.title}</h3>
        <h4>Descrição do serviço:</h4>
        <p>{service?.description}</p>
        <h4 className="mt-4">Informações do Autor:</h4>
        <p>
          <b>Nome</b>: {service?.user.name.firstName} {service?.user.name.lastName}{" "}
          <br></br>
          <b>Cidade</b>: {service?.user.address.city}
          <br></br>
          <b>Contato</b>:{" "}
          <a
            href={
              "http://api.whatsapp.com/send?1=pt_BR&phone=+55" +
              service?.user.phone
            }
            target="_blank"
          >
            <FontAwesomeIcon className={styles.faIcon} icon={faWhatsapp} />
          </a>
        </p>
        <div className="row justify-content-center">

            <button className={styles.hireButton} onClick={contratarServico}>Contratar</button>

        </div>
      </div>
    </Popup>
  );
};

export default ServiceModal;
