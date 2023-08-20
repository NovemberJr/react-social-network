import Dialogs from './Dialogs'
import { actions } from '../../redux/dialogsReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { RootState } from '../../redux/store';
import { StateProps, DispatchProps } from './Dialogs';

const mstp = (state: RootState): StateProps => ({
    dialogs: state.dialogs.dialogs,
    messages: state.dialogs.messages
})

const composedComponent = compose<React.FC>(
    withAuthRedirect,
    connect<StateProps, DispatchProps, unknown, RootState>(mstp, { addMessage: actions.addMessage }),
)(Dialogs)

export default composedComponent
