import React from 'react';
import "./App.css";
import { Link } from 'react-router-dom';
import { Paper, Button, FormControl, InputLabel, Input, Stack, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';

// https://mui.com/material-ui/react-stack/
const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#2B2D42',
    ...theme.typography.body2,
    elevation: 0,
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    textAlign: 'center',
    color: "white",
    width: "40vw",
}));

const Item2 = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#157A6E',
    ...theme.typography.body2,
    elevation: -10,
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    textAlign: 'center',
    color: "white",
    backgroundColor: "#157A6E",
    width: "10vw",
    minWidth: "43px",
}));

const NIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: "#ACACAC",
    "&:hover": {
        backgroundColor: "#DA3E52"
    }
}));


function QuestionMenu(props) {
    // may not persist
    function handleSubmit(e) {
        e.preventDefault()
        var curQ = e.target[0].value
        var curT = e.target[1].value

        if (curQ === "" && curT === "") {
            alert("Input cannot be void")
        } else if (curT === "" || isNaN(parseFloat(curT)) || parseFloat(curT) < 0) {
            alert("Invalid timer for this question")
        } else {
            // for some reason here this will rerender
            props.qsetter(curQ)
            props.tsetter(parseFloat(curT))

            document.getElementById("questions").value = ""
            document.getElementById("timers").value = ""
        }
    }

    function displayMinSec(minutes) {
        var mins = Math.floor(minutes)
        var sec = Math.floor((minutes - mins) * 60)
        return mins + "m " + sec + "s"
    }

    function displayQuestions() {
        return Object.keys(props.qs).map((index) => {
            if (isNaN(parseInt(index))) {
                return null
            } else 
            return (
                <div className="question" key={index} id={"question_" + index}>
                    <Item1 elevation={0}>
                        {props.qs[index]}
                    </Item1>
                    <Item2 elevation={0}>
                        {displayMinSec(props.ts[index])}
                    </Item2>
                    <NIconButton
                        onClick={(e) => {
                            e.preventDefault()
                            props.qpopper(index)
                            props.tpopper(index)
                        }}
                    >
                        <RemoveIcon></RemoveIcon>
                    </NIconButton>
                </div>
            );
        });
    }

    return (
        <div className="Hpage" style={{justifyContent: "flex-start"}}>
            <h1 style={{fontSize: 72, marginBottom: "0.35em"}}>{props.title}</h1>
            <h2 style={{fontSize: 36, marginBottom: "2em", marginTop: "0.2em"}}>Make your test.</h2>
            <form
                onSubmit={handleSubmit}
                className="menu"
            >
                <FormControl style={{margin: '1.5em', marginTop: "-1.5em"}}>
                    <InputLabel htmlFor="questions">Type a question</InputLabel>
                    <Input
                        id="questions"
                        type="text"
                        onChange={ (e) => document.getElementById("questions").value = e.target.value}
                        style={{width: "31vw", minWidth: "30ch"}}
                    >
                    </Input>
                </FormControl>
                <FormControl style={{margin: "1.5em"}}>
                    <InputLabel htmlFor="timers">How much time do you have for it? (minutes)</InputLabel>
                    <Input
                        id="timers"
                        type="text"
                        onChange={ (e) => document.getElementById("timers").value = e.target.value}
                        style={{width: "31vw", minWidth: "30ch"}}
                    >
                    </Input>
                </FormControl>
                <div className="buttons" style={{margin: "1.5em"}}>
                    <Button variant='outlined' type='submit' style={{margin: "10px", color: "#047AFB"}}>
                        Add question
                    </Button>
                    <Link
                        style={{textDecoration: 'none'}}
                        to="/startpage"
                    >
                        <Button variant='outlined' style={{margin: "10px", color: "#047AFB"}}>
                            Done!
                        </Button>
                    </Link>
                </div>
            </form>
            <br></br>
            <br></br>
            <Stack>
                {displayQuestions()}
            </Stack>
        </div>
    );
}

export default QuestionMenu;