"use client";

import styles from "./chat.module.css";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";

export default function ChatLayout() {
  return (
    <div className={styles.chatLayout}>
      <div className={styles.contactListWrapper}>
        <ContactList />
      </div>
      <div className={styles.chatWindowWrapper}>
        <ChatWindow />
      </div>
    </div>
  );
}

