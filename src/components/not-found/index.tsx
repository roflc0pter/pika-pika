import { Link } from "@tanstack/react-router";
import { Button, Result, ResultProps } from "antd";
import { FC } from "react";

export const NotFound: FC<ResultProps> = (props) => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to="/">Back Home</Link>
        </Button>
      }
      {...props}
    />
  );
};
