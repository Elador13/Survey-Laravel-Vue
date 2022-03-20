<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyResponse extends Model
{
    use HasFactory;

//    const CREATED_AT = null;
//    const UPDATED_AT = null;

    protected $fillable = ['respondent_name', 'respondent_email', 'survey_id', 'start_date', 'end_date'];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function answers()
    {
        return $this->hasMany(SurveyQuestionAnswer::class);
    }
}
