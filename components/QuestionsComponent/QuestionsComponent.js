import { useState } from "react";
import Image from "next/image";
import { SingleQuestion } from "@components/SingleQuestion";
import { Modal } from "@components/common/Modals";
import { BookModal } from "@components/common/Modals";
import styles from "./QuestionsComponent.module.scss";

function QuestionsComponent() {
  const [showBookModal, setShowBookModal] = useState(false);

  return (
    <div className={styles.gridContainer}>
      <aside className={styles.sidenav}>
        <div className={styles.sidenavTop}>
          <div className={styles.textBack}>
            <Image
              src="/images/back.svg"
              width="70"
              height="19"
              className={styles.icons}
              alt="back"
            />{" "}
            Back
          </div>
          <a
            className={`${styles.textSelect} ${styles.booksText}`}
            onClick={() => {
              setShowBookModal(true);
            }}
          >
            <Image
              className={styles.icons}
              src="/images/book.svg"
              alt="books"
              width="28"
              height="23"
            />
            4
          </a>
        </div>

        <div className={styles.sidenavList}>
          <div className={`${styles.sidenavListItem} ${styles.plusIcon}`}>
            <div>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              Ipsum is that it has a more-or-less normal.....
            </div>
            <div>
              <Image
                src="/images/plusColor.svg"
                alt="plus"
                width="14"
                height="14"
              />
            </div>
          </div>
        </div>
      </aside>
      <SingleQuestion />
      <Modal onClose={() => setShowBookModal(false)} show={showBookModal}>
        <BookModal />
      </Modal>
    </div>
  );
}

export default QuestionsComponent;
