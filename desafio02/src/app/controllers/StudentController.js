import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
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
    const { name, age, height, weight, email } = await Student.create(req.body);

    return res.json({
      name,
      age,
      height,
      weight,
      email,
    });
  }

  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }
}

export default new StudentController();
