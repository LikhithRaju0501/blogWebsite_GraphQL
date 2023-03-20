import React from "react";

import { Modal } from "react-bootstrap";

import EditBlog from "./EditBlog";

const EditModal = ({ hideModal, showModal, data }) => {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>E D I T - B L O G</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditBlog data={data} hideModal={hideModal} />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
