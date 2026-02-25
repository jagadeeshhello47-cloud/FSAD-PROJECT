import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ minHeight: '100dvh', p: { xs: 2, md: 4 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 980 }}>
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={1.5}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Investment Perception and Selection Behavior Towards Mutual Funds
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              This platform helps users understand mutual fund structure, risks, and decision factors through
              live NAV analytics, role-specific workflows, and educational support.
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="Admin" color="primary" variant="outlined" />
              <Chip label="Investor" color="primary" variant="outlined" />
              <Chip label="Financial Advisor" color="primary" variant="outlined" />
              <Chip label="Data Analyst" color="primary" variant="outlined" />
            </Stack>
          </Stack>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>What this project provides</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Mutual fund search and historical NAV charting<br />
                    • Fund comparison support with trend insights<br />
                    • Advisor educational content management<br />
                    • Analyst report generation from live selected fund data<br />
                    • Admin controls for users and content publishing
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Access the platform</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    New users can create an account first. Existing users can sign in directly and continue with
                    their assigned role dashboard.
                  </Typography>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                    <Button component={RouterLink} to="/login?mode=signin" variant="contained">
                      Sign In
                    </Button>
                    <Button component={RouterLink} to="/login?mode=signup" variant="outlined">
                      Sign Up
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
