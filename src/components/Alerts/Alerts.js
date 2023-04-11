
import React from "react";
import { Snackbar } from "react-native-paper";


export function Alerts ({msg, error=false, setError}){

    return(
        <Snackbar
        style={{
            backgroundColor:'#3a3a3a',
            }}
            visible={error}
            onDismiss={() => setError(false)}
            duration={2000}
            action={{
                label: 'OK',                
                onPress: () => setError(false)
              }}
        >
            {msg}
        </Snackbar>
    )

}