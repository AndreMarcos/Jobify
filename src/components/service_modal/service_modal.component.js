import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styles from "./service_modal.module.scss";
import { faTools, faUser } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      <div className={styles.ModalServico}>
        <a className={`close`} onClick={closeModal}>
          &times;
        </a>
        <h3>{service?.title}</h3>

        <div className="row align-items-center">
          <FontAwesomeIcon className={styles.faIcon} icon={faTools} />
          <h4>Descrição</h4>
        </div>

        <p>{service?.description}</p>
        
        <div className="row align-items-center">
          <FontAwesomeIcon className={styles.faIcon} icon={faUser} />
          <h4>Informações do Autor</h4>
        </div>

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

            <button className={styles.hireButton}>Contratar</button>

        </div>
      </div>
    </Popup>
  );
};

export default ServiceModal;
