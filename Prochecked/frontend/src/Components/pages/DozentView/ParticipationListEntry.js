import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles, Button, ListItem, ListItemSecondaryAction, Link, Typography, Input, Grid, Box} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import { Link as RouterLink } from 'react-router-dom';
import { AppApi } from '../../../AppApi';
import {GradingBO} from '../../../AppApi';
import ContextErrorMessage from '../../dialogs/ContextErrorMessage';
import LoadingProgress from '../../dialogs/LoadingProgress';
import ParticipationForm from '../../dialogs/ParticipationForm';
import IconButton from '@material-ui/core/IconButton';
import { spacing } from '@material-ui/system';



/**
 * Renders a ParticipationBO object within a ListEntry and provides a delete button to delete it. Links participations 
 * to a list of transactions. This is done by routing the link to /transactions and passing the ProjectBO and
 * the ParticipationBO as props to the ParticipationList component. It also shows a MoneyTransferDialog to transfer money.
 * 
 * @see See Material-UIs [Lists](https://material-ui.com/components/lists/)
 * @see See Material-UIs [ListItem](https://material-ui.com/api/list-item/)
 * @see See Material-UIs [Link](https://material-ui.com/components/links/)
 * @see See Material-UIs React Router integration [Composition](https://material-ui.com/guides/composition/#link)
 * @see See React Router [ReactRouter](https://reacttraining.com/react-router/web/guides/quick-start)
 * @see See React Router [Link](https://reacttraining.com/react-router/web/api/Link)
 * 
 * @see See [MoneyTransferDialog](#moneytransferdialog)
 * @see See [TransactionList](#transactionlist)
 * 
 * 
 */

class ParticipationListEntry extends Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef();

    // Init an empty state
    this.state = {
      student: '',
      loadingInProgress: false,
      deletingInProgress: false,
      loadingError: null,
      deletingError: null,
      grade: null,
      showParticipationForm: false,
      participation: props.participation,
    }
  }

  /** gets the students for this participation */

  getStudent = () => {
    // console.log("Participationlist", this.state, this.props)
    let stud = this.props.participation.student_id
    if (stud !== 0){ //soll nurnach student im backend suchen, wenn participation auch eine student_id hat
      var api = AppApi.getAPI()
      // console.log(this.props.participation)
      api.getStudent(this.props.participation.student_id).then(student => //.student_id funktioniert (.getStudent_id()nicht?!?!?!?)
      this.setState({
        student: student,
        loadingInProgress: false, // loading indicator 
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          student: '',
          loadingInProgress: false,
          loadingError: e
        })
      );  

    // set loading to true
    this.setState({
      sut: 'loading',//????????
      loadingInProgress: true,
      loadingError: null
    });
  }
}

  /** Deletes this participation */
  deleteParticipation = () => {
    const { participation } = this.props;
    var api = AppApi.getAPI()
    api.deleteParticipation(participation.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      })
      // console.log(participation);
      this.props.onParticipationDeleted(participation);
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        deletingInProgress: false,
        deletingError: e
      })
    );


    // set loading to true
    this.setState({
      deletingInProgress: true,
      deletingError: null
    }, () => this.parentCall()
    
    );
  }

  createGrading(grade, participation_id){
    var api = AppApi.getAPI()
    // console.log(api)
    api.gradingStudent(grade, participation_id).then((grade) =>
        {
          // console.log("createGrading",grade)
        this.setState({
            grade: grade
        })}
        )
      }

  /** Updates the grading */
  updateGrading = (newGrade, participation_id) => {
    // console.log()
    // clone the original grading, in case the backend call fails
    let updatedGrading = Object.assign(new GradingBO(), this.state.grade);
    // console.log(this.state.grade)
    // set the new attributes from our dialog
    // console.log(this.state.student.id)
    updatedGrading.setGrade(newGrade);
    updatedGrading.setParticipation(participation_id)
    console.log(updatedGrading)
    
    AppApi.getAPI().updateGrading(updatedGrading).then(grading => {
      this.setState({
        grade: grading, 
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null                     // no error message
      }, () => {this.getGrading()});
      // keep the new state as base state
      this.baseState.grade = this.state.grade;
      this.props.onClose(updatedGrading);      // call the parent with the new participation
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // disable loading indicator 
        updatingError: e                        // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,                 // show loading indicator
      updatingError: null                       // disable error message
    }, () => this.parentCall()
    );
  }
  
  
getGrading = () => {
  let grade = this.props.participation.grading_id
  // console.log(grade)
  if (grade !== 0 || grade!==null){ //soll nurnach student im backend suchen, wenn participation auch eine student_id hat
    var api = AppApi.getAPI()
    // console.log(this.props.participation)
    api.getGrading(this.props.participation.grading_id).then(grade => 
    this.setState({
      grade: grade,
      loadingInProgress: false, // loading indicator 
      loadingError: null
    })).catch(e =>
      this.setState({ // Reset state with error from catch 
        grade: null,
        loadingInProgress: false,
        loadingError: e
      })
    );  
  // set loading to true
  this.setState({
    sut: 'loading',//????????
    loadingInProgress: true,
    loadingError: null
  });
  }
}



  /** Deletes this participation */
  deleteGrading = () => {
    var api = AppApi.getAPI()
    api.deleteGrading(this.state.grade.getID()).then(() => {
      this.setState({  // Set new state when ParticipationBOs have been fetched
        deletingInProgress: false, // loading indicator 
        deletingError: null
      })
      // console.log(participation);
      // this.props.onParticipationDeleted(participation); //Elternkomponentenaufruf
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        deletingInProgress: false,
        deletingError: e
      })
    );
    // set loading to true
    this.setState({
      deletingInProgress: true,
      deletingError: null
    }, () => this.parentCall()
    );
  }

setStudent = (student) => {
  this.setState({
    student: student
  })
}
parentCall = () => {
  this.props.getParticipationsByProject()
}

// updateProject = (new_state) => {
//   // clone the original cutomer, in case the backend call fails
//   console.log(new_state)
//   let updatedProject = Object.assign(new ProjectBO(), this.props.project);
//   // set the new attributes from our dialog
//   updatedProject.setProjectState(new_state);
 
//   AppApi.getAPI().updateProject(updatedProject).then(project => {
//     this.setState({
//       // project: project,
//       updatingInProgress: false,              // disable loading indicator  
//       updatingError: null                     // no error message
//     });
//     // keep the new state as base state
//     this.baseState.project = this.state.project;
//     this.props.onClose(updatedProject);      // call the parent with the new project
//   }).catch(e =>
//     this.setState({
//       updatingInProgress: false,              // disable loading indicator 
//       updatingError: e                        // show error message
//     })
//   );

//   // set loading to true
//   this.setState({
//     updatingInProgress: true,                 // show loading indicator
//     updatingError: null                       // disable error message
//   });
// }
  
    passed(){
      let passed = this.state.grade.passed
      // console.log(passed)
      // if (passed !== undefined){
        if (passed == true){
          return "Bestanden"
        }      
        else {
          return "Nicht Bestanden"
        }
      // }
    }

   /** Handles the onClick event of the edit participation button */
   editParticipationButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showParticipationForm: true
    });
  }

  /** Handles the onClose event of the ParticipationForm */
  participationFormClosed = (participation) => {
    // participation is not null and therefor changed
    if (participation) {console.log(participation)
      this.setState({
        participation: participation,
        showParticipationForm: false
      });
    } else {
      this.setState({
        showParticipationForm: false
      });
    }
  }

 
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ grade:
      this.textInput.current.value})
      console.log(this.props.participation)
      if (this.props.participation.grading_id === 0 || this.props.participation.grading_id === null) {
      this.createGrading(this.textInput.current.value, this.props.participation.getID())
      this.getGrading() 
    }
      else {
        this.updateGrading(this.textInput.current.value, this.props.participation.getID())
      }
      // this.updateProject(5)
    }
     
  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    // load initial balance
    // debugger;
    this.getGrading();
    this.getStudent();
      
    }
  
  /** Lifecycle method, which is called when the component was updated */
  componentDidUpdate(prevProps) {
    if ((this.props.show) && (this.props.show !== prevProps.show)) {
      this.getStudent();
      this.getGrading();
      }
    }

  /** Renders the component */
  render() {
    const { classes, project, participation } = this.props;
    const { loadingInProgress, deletingInProgress, loadingError, deletingError, showParticipationForm, student, grade } = this.state;
    

    return (
      
      project.project_state === 3?
      <div>
        <ListItem>
          <Typography className={classes.participationEntry}>
       
            <div>
            {student.matr_nr + " - " + student.name}
            </div>
      
            <Button color='primary' onClick={this.editParticipationButtonClicked}>
              edit
            </Button>

          </Typography>

          <ListItemSecondaryAction>          
            <Button color='secondary' size='small' endIcon={<DeleteIcon/>} onClick={this.deleteParticipation}>
             Löschen
            </Button>
          </ListItemSecondaryAction>

        </ListItem>
        <ListItem>
          <LoadingProgress show={loadingInProgress || deletingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The student of participation ${participation.getID()} could not be loaded.`} onReload={this.getStudent}/>
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The student of participation ${participation.getID()} could not be loaded.`} onReload={this.getGrading}/>
          <ContextErrorMessage error={deletingError} contextErrorMsg={`The participation ${participation.getID()} could not be deleted.`} onReload={this.deleteParticipation}/>
        </ListItem>
        <ParticipationForm show={showParticipationForm} participation={participation} student={student} onClose={this.participationFormClosed} setStud={this.setStudent}/>
      </div>

      :project.project_state >=4?
      <div>
        <ListItem>
          <Grid container>
          <Grid item xs={4}>
          <Typography className={classes.participationEntry}>
            {/* <Link component={RouterLink} to={{
              pathname: '/StudentZuordnung',
              owner: {
                project: project,
                participation: participation
              }
            }} >
              Teilnehmer {participation.id + " - " + student.matr_nr + " - " + student.name}
            </Link> */}
       
            <div>
            {this.state.student.matr_nr + " - " + this.state.student.name}
            </div>
           

            <Button color='primary' onClick={this.editParticipationButtonClicked}>
              edit
            </Button>
          </Typography>
          </Grid>
          
            <div>
            {/* <form className={classes.root} noValidate autoComplete="off"> */}
            <Grid item xs={4}>
            <form >
              {/* <Input type="text" placeholder="Note" ref ={this.textInput} inputProps={{ 'aria-label': 'description' }} className= "form-control" /> */}
              <Grid item xs={2}>
              <input placeholder= "Note" type="text" ref={this.textInput} className= "form-control"/>
              </Grid>

              <Grid item xs={2}>
              <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' endIcon={<SendIcon/>} onClick={this.handleSubmit}>
              Bewerten
              </Button>
              </Grid>

              {/* <input type="checkbox" checked={participation.graded} onChange={handleGraded}/> */}
            </form>
            </Grid>
            {/* {project.project_state ===4? */}
            <Typography variant='body2' color={'textSecondary'}>
              {grade != null?  
              <div>Bewertet: {grade.grade + " - " + this.passed()}
           

            <IconButton aria-label="delete" style ={{color: "gray"}} onClick={() => this.deleteGrading()}
 >             <DeleteIcon />
            </IconButton>
            </div>
            :'unbewertet'}

            </Typography>
            </div>

          <ListItemSecondaryAction>          
            <Button color='secondary' size='small' endIcon={<DeleteIcon/>} onClick={this.deleteParticipation}>
             Löschen
            </Button>
          </ListItemSecondaryAction>
          </Grid>
        </ListItem>
        <ListItem>
          <LoadingProgress show={loadingInProgress || deletingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The student of participation ${participation.getID()} could not be loaded.`} onReload={this.getStudent}/>
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The student of participation ${participation.getID()} could not be loaded.`} onReload={this.getGrading}/>
          <ContextErrorMessage error={deletingError} contextErrorMsg={`The participation ${participation.getID()} could not be deleted.`} onReload={this.deleteParticipation}/>
        </ListItem>
        <ParticipationForm show={showParticipationForm} participation={participation} student={student} onClose={this.participationFormClosed} setStud ={this.setStudent}/>
      </div>

      :
      <div>
        {/* <ListItem>
          <Typography className={classes.participationEntry}>      
            <div>
              {student.matr_nr + " - " + student.name}
            </div>
          </Typography>
          <Typography variant='body2' color={'textSecondary'}>
              Bewertet: {grade.grade + " - " + this.passed()}
          </Typography>

        </ListItem>
        <ListItem>
          <LoadingProgress show={loadingInProgress || deletingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The student of participation ${participation.getID()} could not be loaded.`} onReload={this.getStudent}/>
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The student of participation ${participation.getID()} could not be loaded.`} onReload={this.getGrading}/>
          <ContextErrorMessage error={deletingError} contextErrorMsg={`The participation ${participation.getID()} could not be deleted.`} onReload={this.deleteParticipation}/>
        </ListItem>
        <ParticipationForm show={showParticipationForm} participation={participation} student={student} onClose={this.participationFormClosed} setStud ={this.setStudent}/> */}
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%'
  }, 
  buttonMargin: {
    marginRight: theme.spacing(2),
  },
  participationEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

//TEXTFIELD PLACEHOLDER STYLES --> noch bearbeiten
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
    }));

/** PropTypes */
ParticipationListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The ProjectBO of this ParticipationListEntry */
  project: PropTypes.object.isRequired,
  /** The ParticipationBO to be rendered */
  participation: PropTypes.object.isRequired,
  /**  
   * Event Handler function which is called after a sucessfull delete of this participation. 
   * 
   * Signature: onParticipationDeleted(ParticipationBO participation); 
   */
  onParticipationDeleted: PropTypes.func.isRequired,
  /** If true, balance is (re)loaded */
  show: PropTypes.bool.isRequired
}


//TEXTFIELD

export default withStyles(styles, useStyles)(ParticipationListEntry);