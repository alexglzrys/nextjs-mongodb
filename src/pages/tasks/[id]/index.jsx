import axios from "axios";
import Error from "next/error";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Confirm, Grid } from "semantic-ui-react";

const TaskDetailPage = ({ task, error }) => {
  // Estado para controlar la visualización del modal
  const [openModal, setOpenModal] = useState(false);
  // Estado para mostrar un loader mientras se elimina la tarea
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e) => {
    try {
        // mostrar loading en botón eliminar
      setIsDeleting(true);
      // ocultar modal
      setOpenModal(false);
      // Obtener el ID de la tarea actual y solicitar su eliminación
      const { data } = await axios.delete(`/api/tasks/${task._id}`);
      toast.success("Tarea eliminada del sistema");
      router.push("/");
    } catch (error) {
      toast.error(error.response.mesage);
    }
  };

  // Lanzar componente preconstruido de Next para visualización de errores.
  if (error)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={1}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div>
            {/* Este botón muestra la ventana modal */}
            <Button
              color="red"
              onClick={() => setOpenModal(true)}
              loading={isDeleting}
            >
              Eliminar
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      {/* Componente modal - confirmar eliminación */}
      <Confirm
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onConfirm={handleDelete}
        header="Advertencia"
        content="¿Deseas eliminar esta tarea del sistema?"
      />
    </Grid>
  );
};

export async function getServerSideProps({ query: { id } }) {
  try {
    // Consultar la tarea con el ID solicitado
    const { data: task } = await axios.get(
      `http://localhost:3000/api/tasks/${id}`
    );
    return {
      props: {
        task,
        error: null,
      },
    };
  } catch (error) {
    // Enviar a la vista información depurada del error
    return {
      props: {
        task: null,
        error: {
          statusCode: error.response.status,
          statusText: error.response.data.message,
        },
      },
    };
  }
}

export default TaskDetailPage;
