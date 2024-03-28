import React from 'react';

function LoginRegisterContainer({ children, ...rest }) {
  return (
    <fieldset className="doodle doodle-border" {...rest}>
      {children}
    </fieldset>
  );
}

export default LoginRegisterContainer;