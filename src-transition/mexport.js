this.parse = function(src, isModule ) {
  var newp = new Parser(src, isModule);
  return newp.parseProgram();
};

this.Parser = Parser;  
this.ErrorString = ErrorString;
this.Template = Template;
this.Emitter = Emitter;
this.Transformer = Transformer;
this.Scope = Scope;
this.Hitmap = Hitmap;
this.GlobalScope = GlobalScope;
/*
this.ST_GLOBAL  = ST_GLOBAL ;
this.ST_MODULE  = ST_MODULE ;
this.ST_SCRIPT  = ST_SCRIPT ;
this.ST_DECL  = ST_DECL ;
this.ST_CLS  = ST_CLS ;
this.ST_FN  = ST_FN ;
this.ST_CLSMEM  = ST_CLSMEM ;
this.ST_SETTER  = ST_SETTER ;
this.ST_GETTER  = ST_GETTER ;
this.ST_STATICMEM  = ST_STATICMEM ;
this.ST_CTOR  = ST_CTOR ;
this.ST_OBJMEM  = ST_OBJMEM ;
this.ST_ARROW  = ST_ARROW ;
this.ST_BLOCK  = ST_BLOCK ;
this.ST_CATCH  = ST_CATCH ;
this.ST_ASYNC  = ST_ASYNC ;
this.ST_BARE  = ST_BARE ;
this.ST_BODY  = ST_BODY ;
this.ST_METH  = ST_METH ;
this.ST_EXPR  = ST_EXPR ;
this.ST_GEN  = ST_GEN ;
this.ST_HEAD  = ST_HEAD ;
this.ST_PAREN  = ST_PAREN ;

this.ST_ACCESSOR  = ST_ACCESSOR ;
this.ST_SPECIAL  = ST_SPECIAL ;
this.ST_MEM_FN  = ST_MEM_FN ;
this.ST_TOP  = ST_TOP ;
this.ST_LEXICAL  = ST_LEXICAL ;
this.ST_HOISTABLE  = ST_HOISTABLE ;
this.ST_ANY_FN  = ST_ANY_FN ;
this.ST_CONCRETE  = ST_CONCRETE ;
this.ST_NONE = 0;

this.SM_LOOP  = SM_LOOP ;
this.SM_UNIQUE  = SM_UNIQUE ;
this.SM_STRICT  = SM_STRICT ;
this.SM_INARGS  = SM_INARGS ;
this.SM_INBLOCK  = SM_INBLOCK ;
this.SM_INSIDE_IF  = SM_INSIDE_IF ;
this.SM_CLS_WITH_SUPER  = SM_CLS_WITH_SUPER ;
this.SM_FOR_INIT  = SM_FOR_INIT ;
this.SM_YIELD_KW  = SM_YIELD_KW ;
this.SM_AWAIT_KW  = SM_AWAIT_KW ;
this.SM_NONE = SM_NONE;

this.SA_THROW  = SA_THROW ;
this.SA_AWAIT  = SA_AWAIT ;
this.SA_BREAK  = SA_BREAK ;
this.SA_RETURN  = SA_RETURN ;
this.SA_YIELD  = SA_YIELD ;
this.SA_CONTINUE  = SA_CONTINUE ;
this.SA_CALLSUP  = SA_CALLSUP ;
this.SA_MEMSUP  = SA_MEMSUP ;
this.SA_NONE = 0;

this.DM_CLS  = DM_CLS ;
this.DM_FUNCTION  = DM_FUNCTION ;
this.DM_LET  = DM_LET ;
this.DM_TEMP  = DM_TEMP ;
this.DM_VAR  = DM_VAR ;
this.DM_CONST  = DM_CONST ;
this.DM_SCOPENAME  = DM_SCOPENAME ;
this.DM_CATCHARG  = DM_CATCHARG ;
this.DM_FNARG  = DM_FNARG ;
this.DM_ARGUMENTS  = DM_ARGUMENTS ;
this.DM_NEW_TARGET  = DM_NEW_TARGET ;
this.DM_LTHIS  = DM_LTHIS ;
this.DM_MEMSUP  = DM_MEMSUP ;
this.DM_CALLSUP  = DM_CALLSUP ;
this.DM_GLOBAL  = DM_GLOBAL ;
this.DM_LIQUID  = DM_LIQUID ;
this.DM_NONE = 0;

this.RS_ARGUMENTS  = RS_ARGUMENTS ;
this.RS_SMEM  = RS_SMEM ;
this.RS_SCALL  = RS_SCALL ;
this.RS_NTARGET  = RS_NTARGET ;
this.RS_THIS = RS_THIS;
*/
