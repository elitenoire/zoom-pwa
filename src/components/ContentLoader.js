import React from 'react';
import ContentLoader from "react-content-loader"
import { Grid } from 'material-ui'


const MyLoader = () => {
  // Just 6 items
  const list = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
  return (
    <Grid container style={{flexGrow: 1, padding: 32}}>
      <Grid item xs={12} >
        <Grid container spacing={16}>
          {list.map((key) => {
            return (
              <Grid item xs={6} md={4} key={key}>
                <ContentLoader
                  height={300}
                  width={400}
                  speed={3}
                  primaryColor={"#e4e7f6"}
                  secondaryColor={"#e8ecfc"}
                >
                  <rect x="1" y="1" rx="5" ry="5" width="399" height="150" />
                  <rect x="10" y="170" rx="4" ry="4" width="380" height="20" />
                  <rect x="10" y="195" rx="4" ry="4" width="380" height="20" />
                  <rect x="10" y="220" rx="4" ry="4" width="380" height="20" />
                  <rect x="15" y="250" rx="8" ry="18" width="36.5" height="15" />
                  <rect x="73" y="250" rx="5" ry="5" width="114" height="15" />
                </ContentLoader>
              </Grid>
            )
          } )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MyLoader;