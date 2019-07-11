import React, { Component } from 'react';
import './modal.css';
class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  componentWillReceiveProps({ isOpen }) {
    if (isOpen) this.focus();
  }

  focus = () => {
    if (this.textInput && this.textInput.current) this.textInput.current.focus();
  };

  render() {
    const {
      isOpen,
      closeModal,
      header,
      content,
      yesText,
      yesAction,
      noText,
      noAction,
      hideCancel,
      children,
      changeMaxWidth,
    } = this.props;
    return (
      <div style={{ display: isOpen === true ? 'flex' : 'none' }} role="dialog">
        <div className="custom-modal modal-dialog-centered">
          <div className="modal-content">
            {header && (
              <div className="modal-header">
                <h4 className="modal-title text-center">{header}</h4>
              </div>
            )}

            <div className="modal-body">
              <div
                className="mark-complete-content inner-form"
                style={{ maxWidth: changeMaxWidth || '350px' }}
              >
                {children}
                {!content && hideCancel && (
                  <div className="row mar-top-30">
                    <div className="col-sm-6 col-12 text-center m-auto">
                      <input
                        type="button"
                        className="form-control btn black-btn"
                        data-dismiss="modal"
                        value={yesText || 'Submit'}
                        onClick={yesAction}
                        ref={this.textInput}
                      />
                    </div>
                  </div>
                )}
                {!content && !hideCancel && (
                  <div className="row mar-top-30">
                    {' '}
                    <div className="col-sm-6 col-12 text-center mar-top-15">
                      <input
                        type="button"
                        data-dismiss="modal"
                        className="form-control btn "
                        value={noText || 'Cancel'}
                        onClick={noAction || closeModal}
                        ref={input => {
                          this.nameInput = input;
                        }}
                      />
                    </div>
                    <div className="col-sm-6 col-12 text-center mar-top-15">
                      <input
                        type="button"
                        className="form-control btn black-btn authFocus"
                        data-dismiss="modal"
                        value={yesText || 'Submit'}
                        onClick={yesAction}
                        ref={this.textInput}
                      />
                    </div>
                  </div>
                )}
                {content && (
                  <div>
                    <h4 className="modal-title text-center mt-3">{content}</h4>
                    <div className="col-sm-6 col-12 text-center m-auto mt-2 mar-top-15">
                      <input
                        type="button"
                        data-dismiss="modal"
                        className="form-control btn mt-4"
                        value="OK"
                        onClick={closeModal}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CustomModal;
