import * as React from "react";
import { Button, Table } from "antd";
import { userRoles } from "../../../../../common/enum/user";
import { ButtonSize } from "../../../../../common/enum";
import { SoundButton } from "../../../../common/hoc/sounds/tap-ui-sound";

const { Column } = Table;
export const BanUsers = ({ users, banUser, isMobileScreen }) => {
  const columnsNames = {
    ID: { key: "id", title: "id", content: null },
    EMAIL: { key: "email", title: "Email" },
    REGISTRATION_DATE: {
      key: "createdAt",
      title: "Дата регистрации",
      content: null,
    },
    ACTIVATED: {
      key: "activated",
      title: "Активирован",
      content: null,
    },
    ACTION: {
      key: "actions",
      title: "Действия",
      content: (_, record) => (
        <SoundButton
          onClick={() => {
            banUser(record.id, false);
          }}
        >
          Разблокировать
        </SoundButton>
      ),
    },
  };
  const renderColumns = () => {
    return Object.values(columnsNames).map((value) => {
      if (value.content) {
        return (
          <Column title={value.title} key={value.key} render={value.content} />
        );
      }
      return (
        <Column title={value.title} key={value.key} dataIndex={value.key} />
      );
    });
  };
  const predicateHandler = (predicate) => {
    return predicate ? "да" : "нет";
  };
  const data = users
    .filter(
      (user) =>
        user.role === userRoles.USER &&
        user.isBanned === true
    )
    .map((user) => ({
      [columnsNames.ID.key]: isMobileScreen
        ? `${columnsNames.ID.title}: ${user.id}`
        : user.id,
      [columnsNames.EMAIL.key]: isMobileScreen
        ? `${columnsNames.EMAIL.title}: ${user.email}`
        : user.email,
      [columnsNames.REGISTRATION_DATE.key]: isMobileScreen
        ? `${columnsNames.REGISTRATION_DATE.title}: ${user.createdAt}`
        : user.createdAt,
      [columnsNames.ACTIVATED.key]: isMobileScreen
        ? `${columnsNames.ACTIVATED.title}: ${predicateHandler(user.activated)}`
        : predicateHandler(user.activated),
    }));
  return (
    <Table
      dataSource={data}
      size={isMobileScreen ? ButtonSize.SMALL : ButtonSize.MIDDLE}
      rowKey={(record) => record.id}
    >
      {renderColumns()}
    </Table>
  );
};
