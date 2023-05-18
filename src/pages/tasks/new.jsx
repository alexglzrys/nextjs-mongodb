import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, Grid } from "semantic-ui-react";

const NewTaskPage = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({})
  const router = useRouter();

  // Función de validación de campos de formulario básica
  const validate = () => {
    const my_errors = {}
    if (!newTask.title) my_errors.title = 'El titulo es requerido';
    if (!newTask.description) my_errors.description = 'La descripción es requerida'
    return my_errors; 
  }

  const hanldeChange = ({ target: { name, value } }) => {
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        // Validar y en caso de error, establecer información en el estado
        const my_errors = validate();
        if (Object.keys(my_errors).length) {
            setErrors(my_errors);
            return;
        }
        setErrors({})
        // Registrar tarea en base de datos
        const {data} = await axios.post('/api/tasks', newTask);
        toast.success('Tarea registrada en el sistema')
        router.push('/');
    } catch (err) {
        toast.error(err.response.data)
    }
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column>
          <h3>Registrar Nueva Tarea</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Titulo"
              name="title"
              placeholder="Titulo de la tarea"
              onChange={hanldeChange}
              value={newTask.title}
              error={errors.title ? {content: errors.title} : null}
            />
            <Form.TextArea
              label="Descripción"
              name="description"
              placeholder="Descripción detallada de la tarea"
              onChange={hanldeChange}
              value={newTask.description}
              error={errors.description ? {content: errors.description} : null}
            />
            <Button primary>Registrar</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default NewTaskPage;
