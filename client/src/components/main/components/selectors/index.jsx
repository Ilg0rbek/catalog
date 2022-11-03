import * as React from "react";
import { ThemeSelector } from "./components";

export const ThemeSelectors = React.memo(({ selectors }) => {
  const renderSelectors = () => {
    return selectors.map((el) => {
      return <ThemeSelector key={`${el.data.id}-selector`} title={el.title} data={el.data} handler={el.handler} defaultValues={el.defaultValues}/>;
    });
  };
  return renderSelectors();
});
