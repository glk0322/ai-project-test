import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { HomePage } from './screens/Home/HomePage';
import { ExploreSearchPage } from './screens/Explore/ExploreSearchPage';
import { ExploreResultsPage } from './screens/Explore/ExploreResultsPage';
import { JobDetailPage } from './screens/Job/JobDetailPage';
import { ApplyConfirmPage } from './screens/Apply/ApplyConfirmPage';
import { ApplyCompletePage } from './screens/Apply/ApplyCompletePage';
import { MyHubPage } from './screens/My/MyHubPage';
import { MyConditionsPage } from './screens/My/MyConditionsPage';
import { MyQualificationsPage } from './screens/My/MyQualificationsPage';
import { MyResumePage } from './screens/My/MyResumePage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExploreSearchPage />} />
          <Route path="/my" element={<MyHubPage />} />
        </Route>

        <Route path="/explore/results" element={<AppShell hideNav><ExploreResultsPage /></AppShell>} />
        <Route path="/job/:jobId" element={<AppShell hideNav><JobDetailPage /></AppShell>} />
        <Route path="/apply/:jobId" element={<AppShell hideNav><ApplyConfirmPage /></AppShell>} />
        <Route path="/apply/:jobId/complete" element={<AppShell hideNav><ApplyCompletePage /></AppShell>} />
        <Route path="/my/conditions" element={<AppShell hideNav><MyConditionsPage /></AppShell>} />
        <Route path="/my/qualifications" element={<AppShell hideNav><MyQualificationsPage /></AppShell>} />
        <Route path="/my/resume" element={<AppShell hideNav><MyResumePage /></AppShell>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
