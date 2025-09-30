"use client";

import styles from "./ContactList.module.css";
import { Avatar, Input } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

export default function ContactList() {
  const contacts = [
    { id: 1, name: "John Doe", online: true },
    { id: 2, name: "Jane Smith", online: false },
    { id: 3, name: "Alice Johnson", online: true },
  ];

  return (
    <div className={styles.contactListContainer}>
      <div className={styles.header}>
        <h3>Chats</h3>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.contacts}>
        {contacts.map((contact) => (
          <div key={contact.id} className={styles.contact}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className={contact.online ? styles.online : ""}
            />
            <div className={styles.contactInfo}>
              <h4>{contact.name}</h4>
              <p>Last message...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
