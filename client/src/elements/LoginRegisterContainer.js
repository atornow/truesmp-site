import React from 'react';

function LoginRegisterContainer({ children, ...rest }) {
  return (
    <fieldset className="doodle doodle-border-2" {...rest}>
      {children}
    </fieldset>
  );
}

export default LoginRegisterContainer;