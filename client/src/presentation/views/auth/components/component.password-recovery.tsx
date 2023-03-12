import { Alert, Box, Button, CircularProgress, Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper, styled, TextField } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import KeyIcon from '@mui/icons-material/Key';
import React from 'react'
import Globals from 'core/globals';
import PublicRoutes from 'presentation/routes/public_routes';
import { useNavigate } from 'react-router-dom';

export const PasswordRecovery = () => {

  const [securityQuestion, setSecurityQuestion] = React.useState<string>('test')
  const [securityAnswer, setSecurityAnswer] = React.useState<string>('')
  const [newPassword, setNewPassword] = React.useState<string>('')
  const [confirmPassword, setConfirmPassword] = React.useState<string>('')

  const [email, setEmail] = React.useState<string>('')
  const navigator = useNavigate();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(0)

  const onEmailSearch = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${Globals.TRANSACTIONAL_API}/auth/getSecurityAnswer?email=${email}`,
    );

    const data = await response.json();

    if (response.status !== 200) {
      alert(data.message);
      setIsLoading(false);
      return;
    }

    setSecurityQuestion(data.data);

    setStep(1);
    setIsLoading(false);
  }

  const onSecurityAnswer = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${Globals.TRANSACTIONAL_API}/auth/validateSecurityAnswer?email=${email}&securityAnswer=${securityAnswer}`,
    );

    const data = await response.json();

    if (response.status !== 200) {
      alert(data.message);
      setIsLoading(false);
      return;
    }

    setStep(2);
    setIsLoading(false);
  }

  const onPasswordUpdate = async () => {
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    const response = await fetch(
      `${Globals.TRANSACTIONAL_API}/auth/resetPassword`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password: newPassword,
          answer: securityAnswer
        }),
      }
    );

    const data = await response.json();

    if (response.status !== 200) {
      alert(data.message);
      setIsLoading(false);
      return;
    }

    alert('Contraseña actualizada correctamente');
    setIsLoading(false);
    navigator(PublicRoutes.Login);
  }

  const steps = [
    'Escriba su correo',
    'Responda la pregunta de seguridad',
    'Actualice su contraseña',
  ];

  return (
    <div className="bg-zinc-100 h-screen w-screen p-[5rem]">
      <div
        className="p-[3rem] flex flex-col bg-white shadow rounded justify-center items-center"
      >
        <h1
          className="text-3xl font-bold"
        >
          Recuperación de contraseña
        </h1>
        <br />

        <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <br />

        {
          step === 0 &&
          <div
            className="flex flex-col justify-center items-center"
          >
            <TextField
              sx={{ minWidth: "300px" }}
              id="filled-basic"
              label="Escriba su correo"
              variant="filled"
              title='Escriba su correo'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escriba su correo"
              helperText="Escriba su correo"
            />
            <br />
            {
              isLoading &&
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box> ||
              <Button
                variant="contained"
                onClick={onEmailSearch}
              >
                Buscar usuario
              </Button>
            }
          </div>
        }
        {
          step === 1 &&
          <div
            className="flex flex-col justify-center items-center"
          >
            <TextField
              sx={{ minWidth: "300px" }}
              id="filled-basic"
              label={securityQuestion}
              variant="filled"
              title='Escriba su respuesta'
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              placeholder="Escriba su respuesta"
              helperText="Escriba su respuesta"
            />
            <br />
            {
              isLoading &&
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box> ||
              <Button
                variant="contained"
                onClick={onSecurityAnswer}
              >
                Responder pregunta
              </Button>
            }
          </div>
        }
        {
          step === 2 &&
          <div
            className="flex flex-col justify-center items-center"
          >
            <TextField
              sx={{ minWidth: "300px" }}
              id="filled-basic"
              label="Escriba su nueva contraseña"
              variant="filled"
              type="password"
              title='Escriba su nueva contraseña'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Escriba su nueva contraseña"
              helperText="Escriba su nueva contraseña"
            />
            <br />
            <TextField
              sx={{ minWidth: "300px" }}
              id="filled-basic"
              label="Confirme su nueva contraseña"
              variant="filled"
              type="password"
              title='Confirme su nueva contraseña'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme su nueva contraseña"
              helperText="Confirme su nueva contraseña"
            />
            <br />

            {
              isLoading &&
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box> ||
              <Button
                variant="contained"
                onClick={onPasswordUpdate}
              >
                Actualizar contraseña
              </Button>
            }
          </div>
        }
      </div>
    </div>
  )
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <EmailIcon />,
    2: <QuestionMarkIcon />,
    3: <KeyIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));
