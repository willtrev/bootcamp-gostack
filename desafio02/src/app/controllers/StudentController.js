import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  // Metodo para cadastro dos estudantes
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .required()
        .positive()
        .integer(),
      height: Yup.number()
        .required()
        .positive(),
      weight: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { id, name, age, height, weight, email } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      age,
      height,
      weight,
      email,
    });
  }

  // Metodo Get para retorno da lista com todos estudantes
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  // Metodo para atualizacao do cadastro dos estudantes
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .integer(),
      height: Yup.number().positive(),
      weight: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { index } = req.params;
    const { email } = req.body;

    const student = await Student.findByPk(index);

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists' });
      }
    }

    const { id, name, age, height, weight } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      height,
      weight,
    });
  }
}

export default new StudentController();
