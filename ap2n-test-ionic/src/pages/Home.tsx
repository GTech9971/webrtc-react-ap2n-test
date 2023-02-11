import { IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';


const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonList>
            <IonItem>
              <IonLabel>
                <a href='/controller'>Controller</a>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <a href='/uploader'>Uploader</a>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
