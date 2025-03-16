import { Alert, Button, Result, ResultProps } from "antd";
import { FC, useState } from "react";

interface UnexpectedErrorProps {
  error: Error;
  resultProps?: ResultProps;
}

export const UnexpectedError: FC<UnexpectedErrorProps> = ({
  error,
  resultProps,
}) => {
  const [showStackTrace, setShowStackTrace] = useState(false);
  return (
    <>
      <Result
        status={"500"}
        title="Something went wrong"
        subTitle="An unexpected error occured"
        extra={<Button type="primary">Back Home</Button>}
        {...resultProps}
      />
      <Alert
        action={
          <Button
            onClick={() => setShowStackTrace((currentVal) => !currentVal)}
          >
            Details
          </Button>
        }
        type="error"
        message={`${error.name}: ${error.message}`}
        description={<pre>{showStackTrace && error.stack}</pre>}
      ></Alert>
    </>
  );
};
