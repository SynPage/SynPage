import React, {useEffect, useState} from 'react';
import {Header} from "./Header";
import {TutorialList} from "./TutorialList";
import {Loading} from "../shared/Loading";
import {Error} from "../shared/Error";
import {Tutorial} from "../generated";
import {loadTutorialsForCurrentTab, retrieveTutorial, sendTutorialToPage} from "../client";

export const Popup = () => {
  const [list, setList] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleTutorialSelection = (tutorial: Tutorial) => {
    setLoading("Loading...");
    if (!tutorial.id) {
      setError("Selected tutorial does not exist.")
      return;
    } else {
      setError(undefined);
    }
    retrieveTutorial(tutorial.id).then(value => {
      sendTutorialToPage(value.data).then(res => {
        setLoading(undefined);
      }, reason => {
        setLoading(undefined);
        setError(reason.message ?? "Unknown error.");
      });
    }, reason => {
      setLoading(undefined);
      setError(reason.message ?? "Unknown error.");
    })
  }

  useEffect(() => {
    setLoading("Loading...");
    loadTutorialsForCurrentTab().then(value => {
      setList(value ?? [])
      setLoading(undefined);
    }, reason => {
      setLoading(undefined);
      setError(reason.message ?? "Unknown error.");
    });
  }, []);

  return (
    <div>
      <Header/>
      <Loading loading={loading}/>
      <Error error={error}/>
      <TutorialList tutorials={list} onTutorialSelection={handleTutorialSelection}/>
    </div>
  );
};